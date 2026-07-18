// src/components/Message.jsx
// Small reusable component for success/error banners.

const Message = ({ type = "info", text }) => {
  if (!text) return null;
  return <div className={`message message-${type}`}>{text}</div>;
};

export default Message;
