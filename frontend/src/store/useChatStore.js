import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  unseenMessages: [],
  isUnseenMessagesLoading: false,
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      console.log(res.data);
      set({ users: res.data.users });
      set({ unseenMessages: res.data.unseenMessages });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  markMessagesAsSeen: async (userId) => {
    try {
      await axiosInstance.put(`/messages/mark/${userId}`);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;

      if (!isMessageSentFromSelectedUser) {
        const { unseenMessages } = get();
        const updatedUnseenMessages = unseenMessages.map((msg) => {
          if (msg.userId === newMessage.senderId) {
            return { ...msg, count: msg.count + 1 };
          }
          return msg;
        });

        const senderExists = updatedUnseenMessages.some(
          (msg) => msg.userId === newMessage.senderId
        );

        if (!senderExists) {
          updatedUnseenMessages.push({
            userId: newMessage.senderId,
            count: 1,
          });
        }

        set({ unseenMessages: updatedUnseenMessages });
        return;
      }

      set({ messages: [...get().messages, newMessage] });
      get().markMessagesAsSeen(newMessage._id);
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  updateUserLastSeen: (onlineUserIds) => {
    set((state) => ({
      users: state.users.map((user) => ({
        ...user,
        lastSeen: onlineUserIds.includes(user._id) ? null : new Date(),
      })),
    }));
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
    set({
      unseenMessages: get().unseenMessages.filter(
        (msg) => msg.userId !== selectedUser._id
      ),
    });
  },
}));
