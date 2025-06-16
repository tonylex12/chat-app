const UnseenMessagesBadge = ({ userId, unseenMessages }) => {
  const unseen = unseenMessages.filter((msg) => msg.userId === userId);
  const unseenCount = unseen.length;

  if (unseenCount > 0) {
    return <div className="badge badge-sm badge-primary">{unseenCount}</div>;
  }
  return null;
};

export default UnseenMessagesBadge;
