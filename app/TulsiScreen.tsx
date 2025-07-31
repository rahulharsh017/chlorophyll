import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";

const BACKEND_URL = "https://gemini-q7ld.onrender.com/api/chat";

const TulsiScreen: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!prompt.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: prompt }]);
    setLoading(true);
    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error contacting AI." },
      ]);
    }
    setPrompt("");
    setLoading(false);
  };

  // Copy or cut message text
  const handleCopy = async (text: string, cut = false, idx?: number) => {
    await Clipboard.setStringAsync(text);
    if (cut && typeof idx === "number") {
      setMessages((prev) => prev.filter((_, i) => i !== idx));
    }
    Alert.alert(cut ? "Cut" : "Copied", cut ? "Message cut!" : "Message copied!");
  };

  // Paste into input
  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync();
    setPrompt((prev) => prev + text);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6fff7" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <Text style={styles.header}>🌱 Tulsi AI Chat</Text>
          <View style={styles.chatWrapper}>
            <ScrollView
              style={styles.chatContainer}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {messages.length === 0 && (
                <Text style={styles.placeholderText}>
                  Start a conversation about Tulsi!
                </Text>
              )}
              {messages.map((msg, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.message,
                    msg.role === "user" ? styles.userMsg : styles.aiMsg,
                  ]}
                  onLongPress={() =>
                    Alert.alert(
                      "Message Options",
                      "",
                      [
                        {
                          text: "Copy",
                          onPress: () => handleCopy(msg.text, false),
                        },
                        {
                          text: "Cut",
                          onPress: () => handleCopy(msg.text, true, idx),
                        },
                        { text: "Cancel", style: "cancel" },
                      ],
                      { cancelable: true }
                    )
                  }
                  activeOpacity={0.7}
                >
                  <Text
                    selectable
                    style={
                      msg.role === "user"
                        ? styles.userMsgText
                        : styles.aiMsgText
                    }
                  >
                    {msg.text}
                  </Text>
                </TouchableOpacity>
              ))}
              {loading && (
                <View style={styles.loadingMsg}>
                  <ActivityIndicator size="small" color="#53E540" />
                </View>
              )}
            </ScrollView>
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Ask something about Tulsi..."
              placeholderTextColor="rgba(128,128,128,0.6)"
              value={prompt}
              onChangeText={setPrompt}
              editable={!loading}
              onSubmitEditing={sendPrompt}
              returnKeyType="send"
              selectionColor="#53E540"
              contextMenuHidden={false} // enables native copy/cut/paste menu
            />
            <TouchableOpacity
              style={[styles.sendBtn, loading && { opacity: 0.6 }]}
              onPress={sendPrompt}
              disabled={loading}
            >
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6fff7",
    padding: 0,
    justifyContent: "flex-end",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#388e3c",
    marginTop: 24,
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 1,
  },
  chatWrapper: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingHorizontal: 8,
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  placeholderText: {
    color: "#bdbdbd",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  message: {
    marginVertical: 6,
    padding: 12,
    borderRadius: 14,
    maxWidth: "85%",
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  userMsg: {
    backgroundColor: "#e0ffe6",
    alignSelf: "flex-end",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  aiMsg: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    borderWidth: 1,
    borderColor: "#53E540",
  },
  userMsgText: {
    color: "#388e3c",
    fontSize: 16,
    fontWeight: "500",
  },
  aiMsgText: {
    color: "#222",
    fontSize: 16,
    fontStyle: "italic",
  },
  loadingMsg: {
    alignSelf: "flex-start",
    marginVertical: 6,
    padding: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#53E540",
    borderRadius: 24,
    padding: 12,
    fontSize: 16,
    marginRight: 8,
    backgroundColor: "#f6fff7",
  },
  sendBtn: {
    backgroundColor: "#53E540",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default TulsiScreen;