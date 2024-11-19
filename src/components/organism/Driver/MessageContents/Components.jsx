import React, { useContext, useEffect, useRef } from 'react'
import DefaultProfile from '../../../../assets/DefaultProfile.png'
import { MessageContext } from '../../../../context/DriverContext/Message/MessageContext';
import { FiPhone, FiVideo } from "react-icons/fi";

const Components = () => {
    const { userInfo, chats, sendMessage,
        setMessage, openChat, chatId, driverId,
        message, openChatContainer, conversation, driverName } = useContext(MessageContext)

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation]);

    return (
        <div className="flex flex-wrap w-full h-[87vh] p-5 bg-gray-100">
            {/* Left Section - Chat List */}
            <div className="w-full lg:w-1/4 p-4 bg-white shadow-lg rounded-lg mb-4 lg:mb-0 h-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Chats</h2>
                <div className="space-y-4 h-[calc(87vh-5rem)] overflow-y-auto">
                    {chats && chats.length > 0 ? (
                        chats.map((chat, index) => (
                            <div
                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 shadow-sm cursor-pointer"
                                onClick={() =>
                                    openChat(chat.chatId, chat.user1_Id, chat.userFn, chat.userLn)
                                }
                                key={index}
                            >
                                <img
                                    src={DefaultProfile}
                                    alt="Avatar"
                                    className="w-12 h-12 rounded-full shadow-md"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{chat?.userFn}</p>
                                    <p className="text-sm text-gray-500">Last message preview...</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No chats available</p>
                    )}
                </div>
            </div>

            {/* Right Section - Chat Window */}
            <div className="w-full lg:w-3/4 bg-white shadow-lg rounded-lg flex flex-col h-full">
                {openChatContainer ? (
                    <>
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <div className="flex items-center">
                                <img
                                    src={DefaultProfile}
                                    alt="Avatar"
                                    className="w-12 h-12 rounded-full shadow-md"
                                />
                                <div className="ml-4">
                                    <h2 className="text-lg font-bold text-gray-800">
                                        {driverName && driverName}
                                    </h2>
                                    <p className="text-sm text-gray-500">Driver</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full shadow-sm"
                                    onClick={() => alert('Calling...')}
                                >
                                    <FiPhone className="text-gray-700 w-5 h-5" />
                                </button>
                                <button
                                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full shadow-sm"
                                    onClick={() => alert('Starting video call...')}
                                >
                                    <FiVideo className="text-gray-700 w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Conversation */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-4">
                            {conversation && conversation.length > 0 ? (
                                conversation.map((message, index) =>
                                    message.sender_Id === userInfo?.id ? (
                                        <div
                                            className="flex items-end justify-end"
                                            key={index}
                                        >
                                            <div className="bg-blue-500 text-white p-3 rounded-lg shadow-lg max-w-xs">
                                                {message.message}
                                            </div>
                                            <img
                                                src={DefaultProfile}
                                                alt="Avatar"
                                                className="w-8 h-8 rounded-full ml-3 shadow-md"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="flex items-start"
                                            key={index}
                                        >
                                            <img
                                                src={DefaultProfile}
                                                alt="Avatar"
                                                className="w-8 h-8 rounded-full mr-3 shadow-md"
                                            />
                                            <div className="bg-gray-100 p-3 rounded-lg shadow-lg max-w-xs">
                                                {message.message}
                                            </div>
                                        </div>
                                    )
                                )
                            ) : (
                                <p className="text-center text-gray-500">No messages yet.</p>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="flex items-center p-4 bg-gray-50 border-t">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-grow p-3 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-blue-300"
                            />
                            <button
                                className="ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
                                onClick={() => sendMessage(chatId, message, driverId)}
                            >
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">No chat selected</p>
                    </div>
                )}
            </div>
        </div>

    )
}

export default Components