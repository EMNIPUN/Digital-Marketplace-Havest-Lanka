import React from "react";


function ChatInterfaceFarmer(props) {
   // const { farmerId, orderId, shopOwnerId } = props;

   // const [inputMessage, setInputMessage] = useState("");
   // const [messages, setMessages] = useState([]);
   // const [loading, setLoading] = useState(false);

   // const scrollableRef = useRef(null);

   // const getMessageData = async () => {
   //    setLoading(true);
   //    try {
   //       const response = await axios.get(
   //          `http://localhost:8005/api/message/messages/${orderId}`
   //       );
   //       setMessages(response.data);
   //    } catch (error) {
   //       console.log(error);
   //    } finally {
   //       setLoading(false);
   //    }
   // };

   // const handleSendMessage = async () => {
   //    if (!inputMessage.trim()) return;

   //    const newMessage = {
   //       content: inputMessage,
   //       orderId: orderId,
   //       sender: "me",
   //    };

   //    try {
   //       await axios.post(
   //          "http://localhost:8005/api/message/sendMessage",
   //          newMessage
   //       );
   //       setInputMessage("");
   //       getMessageData();
   //    } catch (error) {
   //       console.error("Failed to send message:", error);
   //    }
   // };

   // const handleKeyPress = (e) => {
   //    if (e.key === "Enter") {
   //       e.preventDefault();
   //       handleSendMessage();
   //    }
   // };

   // useEffect(() => {
   //    getMessageData();
   // }, []);

   // useEffect(() => {
   //    if (scrollableRef.current) {
   //       scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
   //    }
   // }, [messages]);

   return (
      <div className="w-full h-screen bg-black/30 fixed z-50 top-0 right-0">
         <div className="absolute w-[500px] h-screen bg-white top-0 right-0">
           <h1>hiii</h1>
         </div>
      </div>
   );
}

export default ChatInterfaceFarmer;
