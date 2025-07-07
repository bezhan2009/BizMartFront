"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { conversations } from '@/lib/data';
import type { Conversation as ConversationType } from '@/lib/types';

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(conversations[0] || null);

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-12rem)]">
      <div className="flex items-center gap-4 mb-8">
        <MessageSquare className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold font-headline">Messages</h1>
      </div>
      <Card className="h-full w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
        <div className="col-span-1 border-r flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold font-headline">Conversations</h2>
          </div>
          <ScrollArea className="flex-grow">
            {conversations.map((convo) => (
              <button
                key={convo.id}
                className={cn(
                  "flex items-center gap-4 p-4 w-full text-left hover:bg-accent/50 transition-colors",
                  selectedConversation?.id === convo.id && "bg-accent"
                )}
                onClick={() => setSelectedConversation(convo)}
              >
                <Avatar>
                  <AvatarImage src={convo.participant.avatar} data-ai-hint="user avatar" />
                  <AvatarFallback>{convo.participant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow overflow-hidden">
                  <p className="font-semibold truncate">{convo.participant.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>
        <div className="md:col-span-2 lg:col-span-3 flex flex-col h-full">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={selectedConversation.participant.avatar} data-ai-hint="user avatar" />
                  <AvatarFallback>{selectedConversation.participant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold font-headline">{selectedConversation.participant.name}</h3>
              </div>
              <ScrollArea className="flex-grow p-6 bg-muted/20">
                <div className="space-y-4">
                  {selectedConversation.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex items-end gap-2",
                        msg.sender === 'me' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {msg.sender === 'other' && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={selectedConversation.participant.avatar} data-ai-hint="user avatar" />
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          "max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-2",
                          msg.sender === 'me'
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "bg-card text-card-foreground border rounded-bl-none"
                        )}
                      >
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t bg-background">
                <form className="flex items-center gap-2">
                  <Input placeholder="Type a message..." className="flex-grow" />
                  <Button type="submit" size="icon">
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <MessageSquare className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h2 className="text-2xl font-semibold font-headline">Select a conversation</h2>
              <p className="text-muted-foreground">Choose a conversation from the left panel to start chatting.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
