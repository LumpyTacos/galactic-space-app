import { useState } from "react";
import type { PaperRecord } from "../../api/loadCsv";
import searchRecords from "../../api/search.ts";

type ChatMessage = {
  from: "user" | "bot";
  text: string;
  sources?: PaperRecord[];
};

export default function SimpleChatbot({ papers }: { papers: PaperRecord[] }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSend = () => {
    const userMsg: ChatMessage = { from: "user", text: input };
    setMessages((m) => [...m, userMsg]);

    // Simple retrieval using the search util
    const results = input.trim() ? searchRecords(papers, input).slice(0, 5) : [];

    const botText = results.length
      ? `I found ${results.length} relevant paper(s). See sources below.`
      : "I couldn't find any matching papers.";

    const botMsg: ChatMessage = { from: "bot", text: botText, sources: results };
    setMessages((m) => [...m, botMsg]);
    setInput("");
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="fw-semibold mb-3">Chat with the dataset</h5>

        <div className="border rounded p-3 mb-3" style={{ height: 240, overflowY: "auto" }}>
          {messages.length === 0 ? (
            <div className="text-muted">Ask about papers, e.g. "radiation effects"</div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className={`mb-2 ${m.from === "user" ? "text-end" : ""}`}>
                <div className={`d-inline-block p-2 rounded ${m.from === "user" ? "bg-primary text-white" : "bg-light text-dark"}`}>
                  {m.text}
                </div>
                {m.sources && m.sources.length > 0 && (
                  <ul className="mt-2 mb-0 small">
                    {m.sources.map((s, idx) => (
                      <li key={idx}>
                        <a href={s.Link} target="_blank" rel="noopener noreferrer">{s.Title}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>

        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Ask about papers..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button className="btn btn-primary" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
