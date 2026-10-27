import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type ScrollViewInstance,
} from 'react-native';
import { router } from 'expo-router';
import colors from '../theme/colors';

type Message = {
  id: number;
  from: 'user' | 'agent';
  text: string;
  time: string;
};

const AGENT_NAME = 'Mariam';

function getAgentReply(text: string) {
  const message = text.toLowerCase();
  if (/(order|deliver|ship|track)/.test(message)) {
    return 'I can help with that! Could you share your order number? You can find it in Profile › Order history.';
  }
  if (/(refund|return|exchange)/.test(message)) {
    return 'Returns are free within 14 days of delivery. Tell me which item you want to return and I will start it for you.';
  }
  if (/(pay|card|visa|instapay|vodafone)/.test(message)) {
    return 'We accept Vodafone Cash, VISA and InstaPay. What problem are you seeing with your payment?';
  }
  if (/(thank|thanks)/.test(message)) {
    return 'You are welcome! Is there anything else I can help you with?';
  }
  return 'Thanks for reaching out. Could you give me a few more details so I can look into it?';
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.from === 'user';
  return (
    <View className={`max-w-[80%] gap-1 ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
      <View
        className={`rounded-2xl px-3.5 py-2.5 ${
          isUser ? 'rounded-br-md bg-primary' : 'rounded-bl-md border border-gray-200 bg-surface'
        }`}>
        <Text className={`text-sm leading-5 ${isUser ? 'text-white' : 'text-foreground'}`}>{message.text}</Text>
      </View>
      <Text className="px-1 text-[11px] text-muted">{message.time}</Text>
    </View>
  );
}

export default function SupportChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      from: 'agent',
      text: `Hi! I'm ${AGENT_NAME} from customer support. How can I help you today?`,
      time: formatTime(new Date()),
    },
  ]);
  const [draft, setDraft] = useState('');
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const scrollRef = useRef<ScrollViewInstance>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (replyTimer.current) clearTimeout(replyTimer.current);
  }, []);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;

    setMessages(current => [...current, { id: Date.now(), from: 'user', text, time: formatTime(new Date()) }]);
    setDraft('');
    setIsAgentTyping(true);

    if (replyTimer.current) clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => {
      setMessages(current => [
        ...current,
        { id: Date.now(), from: 'agent', text: getAgentReply(text), time: formatTime(new Date()) },
      ]);
      setIsAgentTyping(false);
    }, 1200);
  };

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1 bg-background">
      <View className="flex-row items-center gap-3 border-b border-gray-200 px-5 pb-3">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back to profile"
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/profile'))}
          className="active:opacity-70">
          <Text className="text-2xl text-primary">‹</Text>
        </Pressable>
        <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Text className="text-base font-bold text-primary">{AGENT_NAME[0]}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-base font-bold text-foreground">{AGENT_NAME} · Support</Text>
          <Text className="text-xs text-muted">{isAgentTyping ? 'Typing…' : 'Online · replies in a few minutes'}</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerClassName="gap-3 px-5 py-4"
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isAgentTyping ? (
          <View className="self-start rounded-2xl rounded-bl-md border border-gray-200 bg-surface px-3.5 py-2.5">
            <Text className="text-sm text-muted">• • •</Text>
          </View>
        ) : null}
      </ScrollView>

      <View className="flex-row items-end gap-2 border-t border-gray-200 bg-surface px-4 py-3">
        <TextInput
          accessibilityLabel="Message"
          placeholder="Type a message"
          placeholderTextColor={colors.muted}
          value={draft}
          onChangeText={setDraft}
          multiline
          className="max-h-28 flex-1 rounded-2xl border border-gray-200 bg-background px-3.5 py-2.5 text-sm text-foreground"
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Send message"
          disabled={!draft.trim()}
          onPress={sendMessage}
          className={`rounded-full bg-primary px-4 py-3 active:opacity-70 ${draft.trim() ? '' : 'opacity-50'}`}>
          <Text className="text-[13px] font-semibold text-white">Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
