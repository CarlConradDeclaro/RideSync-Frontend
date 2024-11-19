import React, { useContext, useEffect, useRef } from 'react'
import DefaultProfile from '../../../../assets/DefaultProfile.png'
import { MessageContext } from '../../../../context/DriverContext/Message/MessageContext';
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
        <div className="flex w-full h-[87vh] p-5">
            {/* Left Section - Chat List */}
            <div className="w-1/4 p-4 bg-white shadow-md">
                <div className="text-xl font-bold mb-4">Chats</div>
                <div className="space-y-4">
                    {/* Example of chat items */}
                    {

                        chats && chats.length > 0 ? (  // check if there is existing chats

                            chats?.map((chats, index) =>
                                <div className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-200"
                                    onClick={() => openChat(chats.chatId, chats.user1_Id, chats.userFn, chats.userLn)}
                                    key={index}
                                >
                                    <img src={DefaultProfile} alt="Avatar" className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold">{chats?.userFn}</p>
                                        <p className="text-sm text-gray-500">padung nako sir</p>
                                    </div>
                                </div>
                            )
                        ) :
                            <div className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-200" >
                                No chats
                            </div>

                    }
                </div>
            </div>

            {/* Right Section - Chat Window */}
            <div className="w-3/4 p-6 bg-gray-50 flex flex-col h-full">{
                openChatContainer ?
                    <>
                        <div className="flex items-center mb-4">
                            <img src={DefaultProfile} alt="Avatar" className="w-12 h-12 rounded-full" />
                            <div className="ml-4">
                                <h2 className="text-lg font-semibold">{driverName && driverName}</h2>
                                <p className="text-sm text-gray-500">Driver</p>
                            </div>
                        </div>


                        <div className="flex-grow overflow-y-auto space-y-4 mb-4">
                            {
                                conversation && conversation.length > 0 && (
                                    conversation.map((message, index) =>
                                        (message.sender_Id == userInfo?.id) ?
                                            <div className="flex items-end justify-end"
                                                key={index}
                                            >
                                                <div className="bg-blue-500 text-white p-3 rounded-lg shadow-sm">{message.message}</div>
                                                <img src={DefaultProfile} alt="Avatar" className="w-8 h-8 rounded-full ml-3" />
                                                <p>{ }</p>
                                            </div>
                                            :
                                            <div className="flex items-start"
                                                key={index}
                                            >
                                                <img src={DefaultProfile} alt="Avatar" className="w-8 h-8 rounded-full mr-3" />
                                                <div className="bg-white p-3 rounded-lg shadow-sm">{message.message}</div>
                                            </div>
                                    )
                                )
                            }

                            <div ref={messagesEndRef} />
                        </div>


                        <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-grow p-2 border rounded-lg mr-4"
                            />
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => sendMessage(chatId, message, driverId)}
                            >Send</button>
                        </div>
                    </>
                    :
                    <>None</>
            }




            </div>

        </div>

    )
}

export default Components