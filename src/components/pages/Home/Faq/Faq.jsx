import React, { useState } from "react";

const faqData = [
  {
    question: "What is Posture Pro and how does it work?",
    answer:
      "Posture Pro is a wearable posture corrector that gently aligns your shoulders, spine, and back. It helps reduce pain, enhance mobility, and build strength over time.",
  },
  {
    question: "Can I wear Posture Pro all day?",
    answer:
      "It’s recommended to wear it for 1–3 hours a day. Over time, your body will naturally maintain better posture without needing constant support.",
  },
  {
    question: "Is Posture Pro suitable for all body types?",
    answer:
      "Yes! Posture Pro is adjustable and designed to comfortably fit a wide range of body shapes and sizes.",
  },
  {
    question: "Will it relieve back and neck pain?",
    answer:
      "Absolutely. It helps realign your posture and reduces strain on your back, neck, and shoulders—often relieving chronic discomfort.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 text-slate-800">
      {/* Heading */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold text-teal-900 sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 max-w-xl text-sm text-slate-600 mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between px-6 py-4 text-left text-teal-800 font-medium"
            >
              {item.question}
              <span className="text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            <div
              className={`px-6 pb-4 text-sm text-slate-600 transition-all duration-300 ease-in-out ${
                openIndex === index ? "block" : "hidden"
              }`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
