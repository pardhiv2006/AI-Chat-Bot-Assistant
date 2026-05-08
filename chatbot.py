import ollama

print("Local AI Chatbot with Memory! Type 'exit' to stop.\n")

messages = []

while True:
    user_input = input("You: ")

    if user_input.lower() == "exit":
        break

    messages.append({"role": "user", "content": user_input})

    response = ollama.chat(
        model="llama3",
        messages=messages
    )

    bot_reply = response['message']['content']
    print("Bot:", bot_reply)

    messages.append({"role": "assistant", "content": bot_reply})