
// Main.tsx
'use client'
import React, { useState } from 'react';
import ChatBody from './ChatBody';

interface Message {
    id: string;
    text: string;
    senderId: string;
    image: string[] | null;
    date: Date;
}

const Main = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const currentUserEmail = "user@example.com"; // Replace with actual user email from your auth system

    const handleSendMessage = (text: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text,
            senderId: currentUserEmail,
            image: null,
            date: new Date()
        };
        setMessages([...messages, newMessage]);
    };

    const handleUploadImages = async (files: File[]) => {
        // Implement your image upload logic here
        // This should return an array of image URLs
        const imageUrls = await Promise.all(
            files.map(file => URL.createObjectURL(file))
        );
        
        const newMessage: Message = {
            id: Date.now().toString(),
            text: '',
            senderId: currentUserEmail,
            image: imageUrls,
            date: new Date()
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className="w-full h-screen">
            <ChatBody
                messages={messages}
                currentUserEmail={currentUserEmail}
                onSendMessage={handleSendMessage}
                onUploadImages={handleUploadImages}
            />
        </div>
    );
};

export default Main;