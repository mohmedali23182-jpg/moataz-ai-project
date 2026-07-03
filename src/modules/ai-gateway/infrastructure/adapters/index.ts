import { IProviderAdapter } from '../../domain/adapter.interface';
import { OpenAIAdapter } from './openai-adapter';
import { GeminiAdapter } from './gemini-adapter';
import { AnthropicAdapter } from './anthropic-adapter';
import { OpenAICompatibleAdapter } from './generic-openai-adapter';

// 1. DeepSeek Adapter
export class DeepSeekAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('deepseek', 'DeepSeek', 'https://api.deepseek.com', {
      supportsStreaming: true,
      supportsVision: false,
      supportsTools: true,
      supportsReasoning: true,
    });
  }
}

// 2. OpenRouter Adapter
export class OpenRouterAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('openrouter', 'OpenRouter', 'https://openrouter.ai/api/v1', {
      supportsStreaming: true,
      supportsVision: true,
      supportsTools: true,
      supportsReasoning: true,
    });
  }
}

// 3. Groq Adapter
export class GroqAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('groq', 'Groq', 'https://api.groq.com/openai/v1', {
      supportsStreaming: true,
      supportsVision: false,
      supportsTools: true,
      supportsReasoning: false,
    });
  }
}

// 4. Together AI Adapter
export class TogetherAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('together', 'Together AI', 'https://api.together.xyz/v1', {
      supportsStreaming: true,
      supportsVision: true,
      supportsTools: true,
      supportsReasoning: false,
    });
  }
}

// 5. Fireworks AI Adapter
export class FireworksAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('fireworks', 'Fireworks AI', 'https://api.fireworks.ai/inference/v1', {
      supportsStreaming: true,
      supportsVision: true,
      supportsTools: true,
      supportsReasoning: false,
    });
  }
}

// 6. Mistral AI Adapter
export class MistralAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('mistral', 'Mistral AI', 'https://api.mistral.ai/v1', {
      supportsStreaming: true,
      supportsVision: false,
      supportsTools: true,
      supportsReasoning: false,
    });
  }
}

// 7. Perplexity AI Adapter
export class PerplexityAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('perplexity', 'Perplexity', 'https://api.perplexity.ai', {
      supportsStreaming: true,
      supportsVision: false,
      supportsTools: false,
      supportsReasoning: false,
    });
  }
}

// 8. Cohere Adapter
export class CohereAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('cohere', 'Cohere', 'https://api.cohere.ai/v1', {
      supportsStreaming: true,
      supportsVision: false,
      supportsTools: true,
      supportsReasoning: false,
    });
  }
}

// 9. HuggingFace Adapter
export class HuggingFaceAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('huggingface', 'HuggingFace', 'https://api-inference.huggingface.co/v1', {
      supportsStreaming: true,
      supportsVision: false,
      supportsTools: false,
      supportsReasoning: false,
    });
  }
}

// 10. NVIDIA NIM Adapter
export class NvidiaAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('nvidia', 'NVIDIA NIM', 'https://integrate.api.nvidia.com/v1', {
      supportsStreaming: true,
      supportsVision: false,
      supportsTools: true,
      supportsReasoning: false,
    });
  }
}

// 11. Replicate Adapter
export class ReplicateAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('replicate', 'Replicate', 'https://openai-proxy.replicate.com/v1', {
      supportsStreaming: true,
      supportsVision: false,
      supportsTools: false,
      supportsReasoning: false,
    });
  }
}

// 12. Ollama Adapter (Local development)
export class OllamaAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('ollama', 'Ollama', 'http://localhost:11434/v1', {
      supportsStreaming: true,
      supportsVision: true,
      supportsTools: true,
      supportsReasoning: false,
    });
  }
}

// 13. LM Studio Adapter (Local development)
export class LMStudioAdapter extends OpenAICompatibleAdapter {
  constructor() {
    super('lmstudio', 'LM Studio', 'http://localhost:1234/v1', {
      supportsStreaming: true,
      supportsVision: false,
      supportsTools: true,
      supportsReasoning: false,
    });
  }
}

// 14. OpenAI Compatible Generic Adapter
export class GenericOpenAIAdapter extends OpenAICompatibleAdapter {
  constructor(id = 'generic', name = 'OpenAI Compatible', baseUrl = '') {
    super(id, name, baseUrl, {
      supportsStreaming: true,
      supportsVision: true,
      supportsTools: true,
      supportsReasoning: true,
    });
  }
}

// Export Registry
export const ADAPTERS_REGISTRY: Record<string, IProviderAdapter> = {
  openai: new OpenAIAdapter(),
  gemini: new GeminiAdapter(),
  anthropic: new AnthropicAdapter(),
  deepseek: new DeepSeekAdapter(),
  openrouter: new OpenRouterAdapter(),
  groq: new GroqAdapter(),
  together: new TogetherAdapter(),
  fireworks: new FireworksAdapter(),
  mistral: new MistralAdapter(),
  perplexity: new PerplexityAdapter(),
  cohere: new CohereAdapter(),
  huggingface: new HuggingFaceAdapter(),
  nvidia: new NvidiaAdapter(),
  replicate: new ReplicateAdapter(),
  ollama: new OllamaAdapter(),
  lmstudio: new LMStudioAdapter(),
};

import { IProviderAdapterRegistry } from '@core/ports/interfaces';

class ProviderAdapterRegistry implements IProviderAdapterRegistry {
  public getAdapter(providerId: string): IProviderAdapter | undefined {
    return ADAPTERS_REGISTRY[providerId];
  }
}

export const AdapterRegistry = new ProviderAdapterRegistry();

export function getAdapter(providerId: string): IProviderAdapter | undefined {
  return ADAPTERS_REGISTRY[providerId];
}
