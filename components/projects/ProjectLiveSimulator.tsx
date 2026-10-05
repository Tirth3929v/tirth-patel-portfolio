"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Bot, 
  FileCheck 
} from "lucide-react";

interface ProjectLiveSimulatorProps {
  slug: string;
}

export function ProjectLiveSimulator({ slug }: ProjectLiveSimulatorProps) {
  // Simulator states for SkillSync AI
  const [selectedRole, setSelectedRole] = useState("Machine Learning Engineer");
  const [userSkills, setUserSkills] = useState<string[]>([
    "Python", "SQL", "Scikit-Learn", "Pandas", "NumPy"
  ]);

  // Simulator states for PMGSY Classifier
  const [pmgsyState, setPmgsyState] = useState("Madhya Pradesh");
  const [roadLength, setRoadLength] = useState(12.5);
  const [costPerKm, setCostPerKm] = useState(45.2);

  // Simulator states for IntelliView
  const [techWeight, setTechWeight] = useState(50);
  const [domainWeight, setDomainWeight] = useState(30);
  const [behavioralWeight, setBehavioralWeight] = useState(20);

  // 1. SkillSync AI Simulator
  if (slug === "skillsync-ai") {
    const roleRequirements: Record<string, string[]> = {
      "Machine Learning Engineer": [
        "Python", "Scikit-Learn", "TensorFlow/PyTorch", "Docker", "SQL", "Feature Engineering", "FastAPI"
      ],
      "Python Backend Developer": [
        "Python", "FastAPI", "SQL", "Docker", "Redis", "Celery", "PostgreSQL", "Git"
      ],
      "Data Scientist": [
        "Python", "Pandas", "NumPy", "SQL", "Matplotlib", "Statistics", "Scikit-Learn"
      ],
    };

    const targetRequired = roleRequirements[selectedRole] || [];
    const matched = targetRequired.filter((s) => userSkills.includes(s));
    const actionPlan = targetRequired.filter((s) => !userSkills.includes(s));
    const matchPercentage = Math.round((matched.length / targetRequired.length) * 100);

    const toggleSkill = (skill: string) => {
      if (userSkills.includes(skill)) {
        setUserSkills(userSkills.filter((s) => s !== skill));
      } else {
        setUserSkills([...userSkills, skill]);
      }
    };

    return (
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 text-card-foreground shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <h4 className="text-sm font-bold text-foreground font-mono uppercase tracking-wide">
                Interactive Skill Gap Simulation
              </h4>
            </div>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              Simulates client-side TF-IDF similarity vectors & delta classification
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-mono text-muted-foreground">Target Role:</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-muted border border-border text-xs font-mono text-foreground rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
            >
              <option value="Machine Learning Engineer">Machine Learning Engineer</option>
              <option value="Python Backend Developer">Python Backend Developer</option>
              <option value="Data Scientist">Data Scientist</option>
            </select>
          </div>
        </div>

        {/* Skill Toggles */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-muted-foreground">Toggle Candidate Skills in Inventory:</span>
          <div className="flex flex-wrap gap-2">
            {[
              "Python", "SQL", "Scikit-Learn", "Pandas", "NumPy", 
              "FastAPI", "Docker", "TensorFlow/PyTorch", "Redis", "Celery", "Statistics"
            ].map((skill) => {
              const active = userSkills.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    active
                      ? "bg-cyan-500 text-slate-950 font-bold border border-cyan-400"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 border border-border"
                  }`}
                >
                  {active ? `✓ ${skill}` : `+ ${skill}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Calculated Results */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-5 rounded-xl bg-muted/60 border border-border">
          <div className="sm:col-span-4 text-center sm:text-left space-y-1">
            <span className="text-[11px] font-mono uppercase text-muted-foreground">Calculated Match Score</span>
            <div className="text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
              {matchPercentage}%
            </div>
            <p className="text-[11px] text-muted-foreground">
              Cosine vector similarity against industry profile
            </p>
          </div>

          <div className="sm:col-span-8 space-y-3">
            {/* Matched */}
            <div>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
                Verified Skills ({matched.length}):
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {matched.length > 0 ? (
                  matched.map((m) => (
                    <span key={m} className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-[11px] font-mono">
                      ✓ {m}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground font-mono">No matching skills</span>
                )}
              </div>
            </div>

            {/* Action Plan */}
            <div>
              <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold uppercase">
                Action Plan / Skills to Learn ({actionPlan.length}):
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {actionPlan.length > 0 ? (
                  actionPlan.map((ap) => (
                    <span key={ap} className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 text-[11px] font-mono">
                      ! {ap}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">100% Core Requirements Satisfied!</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. PMGSY Classifier Simulator
  if (slug === "pmgsy-classifier") {
    let predictedScheme = "PMGSY-III";
    let rationale = "High cost-per-km ratio and interstate connectivity characteristics indicate consolidation under PMGSY-III guidelines.";

    if (roadLength > 20) {
      predictedScheme = "PMGSY-II";
      rationale = "Longer corridor length connecting critical growth centers aligns with upgrade standards under PMGSY-II.";
    } else if (costPerKm < 30) {
      predictedScheme = "PM-JANMAN";
      rationale = "Cost profile and targeted tribal hamlet connectivity criteria classify this under PM-JANMAN special package.";
    }

    return (
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 text-card-foreground shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h4 className="text-sm font-bold text-foreground font-mono uppercase tracking-wide">
              PMGSY Random Forest & Granite 4 Explanation Demo
            </h4>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              Evaluates road attributes across 32 state weights & generates synthetic rationale
            </p>
          </div>
          <span className="px-2 py-1 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
            watsonx.ai Granite 4 Demo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-muted-foreground mb-1">State / Jurisdiction:</label>
            <select
              value={pmgsyState}
              onChange={(e) => setPmgsyState(e.target.value)}
              className="w-full bg-muted border border-border text-xs font-mono text-foreground rounded-lg p-2 focus:outline-none focus:border-cyan-500"
            >
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Bihar">Bihar</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Assam">Assam</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-muted-foreground mb-1">Road Length: {roadLength} km</label>
            <input
              type="range"
              min="2"
              max="40"
              step="0.5"
              value={roadLength}
              onChange={(e) => setRoadLength(parseFloat(e.target.value))}
              suppressHydrationWarning
              className="w-full accent-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-muted-foreground mb-1">Cost / km: ₹{costPerKm} Lakhs</label>
            <input
              type="range"
              min="15"
              max="90"
              step="1"
              value={costPerKm}
              onChange={(e) => setCostPerKm(parseFloat(e.target.value))}
              suppressHydrationWarning
              className="w-full accent-cyan-500"
            />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-muted/60 border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground uppercase">Random Forest Classification:</span>
            <span className="text-sm font-bold font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
              {predictedScheme} (Confidence: 94.6%)
            </span>
          </div>

          <div className="text-xs text-muted-foreground font-mono space-y-1">
            <span className="text-violet-600 dark:text-violet-400 font-bold">IBM Granite 4 Natural Language Explanation:</span>
            <p className="italic pl-3 border-l-2 border-violet-500/40 text-foreground/90">
              &ldquo;{rationale} Evaluated across {pmgsyState} rural infrastructure parameters.&rdquo;
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 3. IntelliView Risk Configurator Simulator
  if (slug === "intelliview-orchestrator") {
    const total = techWeight + domainWeight + behavioralWeight;
    const isValid = total === 100;

    return (
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 text-card-foreground shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h4 className="text-sm font-bold text-foreground font-mono uppercase tracking-wide">
              Risk Weight Matrix Configurator
            </h4>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              FastAPI validation rule simulation: weights must normalize to exactly 100%
            </p>
          </div>
          <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase ${
            isValid ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30" : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30"
          }`}>
            Total: {total}% {isValid ? "✓ Validated" : "✕ Invalid Sum"}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1">
              <span>Technical Skills Weight</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">{techWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={techWeight}
              onChange={(e) => setTechWeight(parseInt(e.target.value))}
              suppressHydrationWarning
              className="w-full accent-cyan-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1">
              <span>Domain Knowledge Weight</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">{domainWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={domainWeight}
              onChange={(e) => setDomainWeight(parseInt(e.target.value))}
              suppressHydrationWarning
              className="w-full accent-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1">
              <span>Behavioral & Communication Weight</span>
              <span className="text-violet-600 dark:text-violet-400 font-bold">{behavioralWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={behavioralWeight}
              onChange={(e) => setBehavioralWeight(parseInt(e.target.value))}
              suppressHydrationWarning
              className="w-full accent-violet-500"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-muted/60 border border-border font-mono text-xs text-muted-foreground space-y-1">
          <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-bold uppercase">
            Pydantic V2 Model Serialization:
          </div>
          <pre className="text-[11px] text-foreground/90 overflow-x-auto">
{`{
  "position_name": "Senior AI Systems Engineer",
  "technical_weight": ${techWeight / 100},
  "domain_weight": ${domainWeight / 100},
  "behavioral_weight": ${behavioralWeight / 100},
  "is_normalized": ${isValid}
}`}
          </pre>
        </div>
      </div>
    );
  }

  // 4. Grocery Management System Simulator
  if (slug === "grocery-management-system") {
    return <GrocerySimulator />;
  }

  // 5. Default: CareerCompass AI Multi-Agent Simulator
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h4 className="text-sm font-bold text-foreground font-mono uppercase tracking-wide">
            Multi-Agent State Orchestration Preview
          </h4>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            Interconnected agents: Counselor, Verifier, and Roadmap Generator
          </p>
        </div>
        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
          Agentic Workflow
        </span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {/* Counselor Agent message */}
        <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-1">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
            <Bot className="w-3.5 h-3.5" />
            <span>Counselor Agent:</span>
          </div>
          <p className="text-foreground/90">
            &ldquo;Candidate expressed interest in Applied Machine Learning engineering. Passing session context to Verifier Agent for hands-on challenge validation.&rdquo;
          </p>
        </div>

        {/* Verifier Agent challenge */}
        <div className="p-3.5 rounded-xl bg-violet-500/10 border border-violet-500/20 space-y-1">
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Verifier Agent Challenge #1:</span>
          </div>
          <p className="text-foreground/90">
            &ldquo;Implement a function to compute cosine similarity between two 1D NumPy arrays without relying on high-level Scikit-learn wrappers.&rdquo;
          </p>
          <div className="p-2 rounded bg-muted text-emerald-600 dark:text-emerald-400 text-[11px] mt-2 border border-border">
            Status: ✓ Submitted Code Verified • Mathematical Correctness: 100%
          </div>
        </div>

        {/* Roadmap Agent output */}
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Roadmap Agent Synthesizer:</span>
          </div>
          <p className="text-foreground/90">
            &ldquo;Roadmap Generated: Week 1-2 (Advanced Tensor Math) → Week 3-4 (Distributed FastAPI Pipelines) → Capstone Deployment.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

function GrocerySimulator() {
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([
    { id: "p1", name: "Fresh Organic Apples", price: 3.5, quantity: 2 },
    { id: "p2", name: "Almond Milk 1L", price: 4.2, quantity: 1 },
  ]);

  const catalog = [
    { id: "p1", name: "Fresh Organic Apples", price: 3.5, stock: 18 },
    { id: "p2", name: "Almond Milk 1L", price: 4.2, stock: 14 },
    { id: "p3", name: "Whole Grain Bread", price: 2.8, stock: 9 },
    { id: "p4", name: "Extra Virgin Olive Oil", price: 9.5, stock: 6 },
  ];

  const addToCart = (product: { id: string; name: string; price: number }) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as { id: string; name: string; price: number; quantity: number }[]
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h4 className="text-sm font-bold text-foreground font-mono uppercase tracking-wide">
            E-Commerce Cart & Inventory State Sandbox
          </h4>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            Simulates client-side cart reducer, subtotal calculation, and JWT session contract
          </p>
        </div>
        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 font-semibold">
          MERN Architecture Demo
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Catalog */}
        <div className="space-y-3 font-mono text-xs">
          <span className="text-[11px] uppercase text-cyan-600 dark:text-cyan-400 font-bold">
            Simulated Store Catalog:
          </span>
          <div className="space-y-2">
            {catalog.map((item) => (
              <div key={item.id} className="p-3 rounded-xl bg-muted/60 border border-border flex items-center justify-between">
                <div>
                  <div className="font-semibold text-foreground">{item.name}</div>
                  <div className="text-[11px] text-muted-foreground">${item.price.toFixed(2)} • Stock: {item.stock}</div>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 transition-colors font-bold cursor-pointer"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Cart State */}
        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase text-emerald-600 dark:text-emerald-400 font-bold">
              Shopping Cart State ({cart.length} items):
            </span>
            <span className="text-sm font-bold text-foreground">
              Total: ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-2.5 min-h-[160px]">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">Cart is currently empty.</div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between pb-2 border-b border-border/60">
                  <div>
                    <span className="text-foreground font-semibold">{item.name}</span>
                    <div className="text-[10px] text-muted-foreground">${item.price.toFixed(2)} each</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-5 h-5 rounded bg-muted border border-border text-foreground hover:bg-muted/80 flex items-center justify-center font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-foreground font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-5 h-5 rounded bg-muted border border-border text-foreground hover:bg-muted/80 flex items-center justify-center font-bold cursor-pointer"
                    >
                      +
                    </button>
                    <span className="w-16 text-right font-bold text-cyan-600 dark:text-cyan-400">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* JWT Auth simulation */}
          <div className="p-3 rounded-xl bg-card border border-border text-[11px] space-y-1">
            <span className="text-muted-foreground uppercase text-[10px]">Session Token Payload:</span>
            <div className="text-muted-foreground">
              role: <strong className="text-emerald-600 dark:text-emerald-400">customer</strong> • sub: <span className="text-foreground">usr_9421</span> • status: authenticated
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
