import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  unseenMessages: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isUnseenMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
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

  getUnseenMessages: async () => {
    set({ isUnseenMessagesLoading: true });
    try {
      const res = await axiosInstance.get("/messages/seen");
      set({ unseenMessages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isUnseenMessagesLoading: false });
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

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;

      if (!isMessageSentFromSelectedUser) return;

      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  updateMessageSeenStatus: async (messageId) => {
    try {
      await axiosInstance.put(`/messages/seen/${messageId}`);
      set((state) => ({
        messages: state.messages.map((message) =>
          message._id === messageId ? { ...message, seen: true } : message
        ),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
    const { unseenMessages } = get();

    const unseenMessagesForSelectedUser = unseenMessages.filter(
      (message) => message.userId === selectedUser._id
    );

    unseenMessagesForSelectedUser.forEach((message) => {
      get().updateMessageSeenStatus(message.messageId);
    });

    set((state) => ({
      unseenMessages: state.unseenMessages.filter(
        (message) => message.userId !== selectedUser._id
      ),
    }));
  },
}));
