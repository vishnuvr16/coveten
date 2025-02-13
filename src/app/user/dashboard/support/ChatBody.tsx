// ChatBody.tsx
'use client'
import React, { useEffect, useRef, useState } from 'react';
import 'react-photo-view/dist/react-photo-view.css';

interface Message {
    id: string;
    text: string;
    senderId: string;
    image: string[] | null;
    date: Date;
}

interface Props {
    messages: Message[];
    currentUserEmail: string;
    onSendMessage: (text: string) => void;
    onUploadImages: (files: File[]) => Promise<void>;
}

const ChatBody = ({ messages, currentUserEmail, onSendMessage, onUploadImages }: Props) => {
    const [text, setText] = useState('')
    const [uploading, setUploading] = useState(false);
    const latestMessageRef = useRef(null)

    useEffect(() => {
        if (latestMessageRef.current) {
            // @ts-ignore
            latestMessageRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (text.trim()) {
            onSendMessage(text)
            setText('')
            const form = e.target as HTMLFormElement
            form.reset()
        }
    }

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            setUploading(true)
            const filesArray = Array.from(files);
            await onUploadImages(filesArray)
            setUploading(false)
        }
    }

    return (
        <div className="flex flex-col flex-auto h-full shadow-md bg-white pb-2 rounded-lg border border-gray-100">
            <div className="flex flex-col flex-auto flex-shrink-0 bg-white h-full">
                <div className='bg-desktopBgLight px-5 shadow-sm py-5 flex items-center'>
                    <p className='bg-green-500 w-3 h-3 rounded-full mr-2'></p>
                    <p className='font-bold text-desktopPrimary'>{currentUserEmail}</p>
                </div>

                <div className="flex flex-col px-5 h-full overflow-y-auto mb-4 p-4">
                    <div className="flex flex-col h-full">
                        <div className="grid grid-cols-12 gap-y-2">
                            {messages.map((message) => (
                                <div key={message.id} className="col-start-6 col-end-13 p-3 rounded-lg">
                                    <div className="flex items-center justify-start flex-row-reverse">
                                        <div className={`
                                            ${message.senderId === currentUserEmail ? 'bg-desktopPrimary' : 'bg-gray-800'}
                                            flex items-center justify-center h-10 w-10 rounded-full text-white font-bold flex-shrink-0`}>
                                            {message.senderId.slice(0, 1).toUpperCase()}
                                        </div>
                                        <div ref={latestMessageRef}
                                            className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                            {message.image && message.image.map((image, i) => (
                                                <div key={i}>
                                                    <img src={image} alt="" className='h-32 w-32' />
                                                </div>
                                            ))}
                                            {message.text && <div>{message.text}</div>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {uploading && (
                                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                    <div className="flex items-center justify-start flex-row-reverse">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold flex-shrink-0">
                                            {currentUserEmail.slice(0, 1).toUpperCase()}
                                        </div>
                                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                            <p>Uploading Image....</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!messages.length && (
                                <div className="col-start-6 col-end-13 p-3 rounded-lg flex items-center justify-center">
                                    <p>No messages yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="h-16 sm:mb-0">
                    <div className="relative flex border-none h-full">
                        <input 
                            onChange={(e) => setText(e.target.value)} 
                            type="text" 
                            placeholder="Write your message!" 
                            className="w-full outline-none focus:outline-none focus:border-none focus:ring-0 text-gray-600 placeholder-gray-600 pl-12 bg-primary/20 border-none shadow-md rounded-md py-3" 
                        />
                        <div className="absolute right-0 items-center inset-y-0 pr-5 hidden sm:flex">
                            <div>
                                <label htmlFor="dropzone-file" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <input onChange={handleUploadImage} id="dropzone-file" type="file" multiple accept="image/*" className="hidden" />
                                </label>
                            </div>
                            <button type="submit" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatBody;