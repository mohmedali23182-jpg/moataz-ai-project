'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@presentation/components/ui/card';
import { Button } from '@presentation/components/ui/button';
import { Badge } from '@presentation/components/ui/badge';
import { useLanguage } from '@core/providers/language-provider';
import {
  Sparkles, Bot, Brain, FileText, Cpu, GitPullRequest, ArrowRight, Github, HelpCircle, Key, CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { t } = useLanguage();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [step, setStep] = useState(0);

  const onboardingSteps = [
    {
      title: 'Welcome to Moataz AI',
      desc: 'The commercial-grade, multi-tenant AI SaaS Platform. Let\'s configure your setup.',
      icon: Sparkles,
    },
    {
      title: 'Provider API Key Setup',
      desc: 'Navigate to settings or click below to save and test your rotated keys securely.',
      icon: Key,
    },
    {
      title: 'Create Your Project Brain',
      desc: 'Initialize a project to isolate chats, files, and Qdrant semantic collections.',
      icon: Brain,
    },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* 1. Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-primary/10 via-primary/5 to-background border p-8 md:p-12 text-center space-y-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <Badge variant="secondary" className="px-3 py-1 text-xs gap-1.5 animate-pulse">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>Commercial AI SaaS Platform</span>
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-primary via-primary/80 to-foreground bg-clip-text text-transparent">
            {t.pages.homeTitle}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            {t.pages.homeSubtitle}
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <Link href="/chat">
            <Button size="lg" className="gap-2">
              <span>Start Chatting</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" onClick={() => setShowOnboarding(true)}>
            Onboarding Wizard
          </Button>
        </div>
      </div>

      {/* Onboarding Interactive Dialog */}
      {showOnboarding && (
        <Card className="max-w-xl mx-auto animate-in slide-in-from-bottom-5 duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              {React.createElement(onboardingSteps[step].icon, { className: 'h-5 w-5 text-primary' })}
              <CardTitle className="text-base font-bold">{onboardingSteps[step].title}</CardTitle>
            </div>
            <Badge variant="outline">Step {step + 1} of 3</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{onboardingSteps[step].desc}</p>
            <div className="flex justify-between items-center pt-2">
              <Button size="sm" variant="ghost" onClick={() => setShowOnboarding(false)}>Skip</Button>
              <div className="flex gap-2">
                {step > 0 && <Button size="sm" variant="outline" onClick={() => setStep(step - 1)}>Back</Button>}
                {step < 2 ? (
                  <Button size="sm" onClick={() => setStep(step + 1)}>Next</Button>
                ) : (
                  <Button size="sm" onClick={() => { setShowOnboarding(false); setStep(0); }}>Finish</Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 2. Platform Core Feature Modules */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: 'Universal AI Gateway',
            desc: 'Model routing across OpenAI, Claude, Gemini, DeepSeek with in-memory caching and rate limiters.',
            icon: Cpu,
            badge: 'Phase 03',
          },
          {
            title: 'Project Brain Isolation',
            desc: 'Strict multi-tenant boundaries. Secure sandbox encapsulating user chat histories and documents.',
            icon: Brain,
            badge: 'Phase 04',
          },
          {
            title: 'File & Chunking Pipelines',
            desc: 'Drag & drop text chunking, local cosine vector generators, and Qdrant semantic indexing.',
            icon: FileText,
            badge: 'Phase 04',
          },
          {
            title: 'Rich Chat Workspace',
            desc: 'Real-time SSE stream renderer with full markdown tables, latex, and code highlight outputs.',
            icon: Bot,
            badge: 'Phase 05',
          },
        ].map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <Card key={idx} className="hover:shadow-md transition duration-200">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{feat.badge}</Badge>
                </div>
                <CardTitle className="text-base font-bold mt-3">{feat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 3. Provider Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Providers & Models</CardTitle>
          <CardDescription>Gateway adapters resolving LLM parameters securely.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {['OpenAI (GPT-4o)', 'Anthropic (Claude 3.5)', 'Google (Gemini 2.5)', 'DeepSeek (V3/R1)'].map((p) => (
              <div key={p} className="p-3 border rounded-xl bg-accent/20 flex flex-col items-center justify-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-semibold">{p}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 4. Roadmap & Architecture */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <GitPullRequest className="h-5 w-5 text-primary" />
              <span>Alpha Release Roadmap</span>
            </CardTitle>
            <CardDescription>Status milestones for Moataz AI.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium text-muted-foreground">Universal Gateway Integration</span>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Completed</Badge>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium text-muted-foreground">Persist Workspace & Repositories</span>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Completed</Badge>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium text-muted-foreground">RAG & Chat UI Streaming</span>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Completed</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-muted-foreground">Plugin Connectors & Agents</span>
              <Badge variant="outline">Planned</Badge>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span>Frequently Asked Questions</span>
            </CardTitle>
            <CardDescription>Got questions? We have answers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs leading-relaxed text-muted-foreground">
            <div>
              <h4 className="font-bold text-foreground mb-1">Is this a mock implementation?</h4>
              <p>No. API keys, workspaces, uploaded files, and vector search query routes connect to functional persistence files/Qdrant fallbacks.</p>
            </div>
            <div className="border-t pt-2">
              <h4 className="font-bold text-foreground mb-1">How secure is the vault?</h4>
              <p>Symmetric AES-256-GCM encryption secures all keys, deriving the key secrets dynamically from environment variables.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
        <span>© 2026 Moataz AI. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/status" className="hover:text-foreground">System Status</Link>
          <a href="https://github.com" className="flex items-center gap-1 hover:text-foreground">
            <Github className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
