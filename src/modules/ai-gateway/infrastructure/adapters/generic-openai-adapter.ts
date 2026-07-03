import {
  IProviderAdapter,
  GatewayChatRequest,
  GatewayChatResponse,
  GatewayStreamChunk,
  ProviderCapabilities,
} from '../../domain/adapter.interface';
import { ApplicationError } from '@shared/errors';

export class OpenAICompatibleAdapter implements IProviderAdapter {
  constructor(
    public readonly id: string,
    public readonly name: string,
    private readonly baseUrl: string,
    private readonly capabilities: ProviderCapabilities
  ) {}

  public getCapabilities(): ProviderCapabilities {
    return this.capabilities;
  }

  public async chat(request: GatewayChatRequest, apiKey: string): Promise<GatewayChatResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: request.model,
          messages: request.messages,
          temperature: request.temperature,
          max_tokens: request.maxTokens,
          response_format: request.jsonMode ? { type: 'json_object' } : undefined,
          tools: request.tools ? request.tools.map((t) => ({ type: 'function', function: t })) : undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApplicationError(
          'PROVIDER_ERROR',
          errorData?.error?.message || `Request failed with status ${response.status}`
        );
      }

      const data = await response.json();
      return {
        id: data.id,
        model: data.model,
        choices: data.choices.map((c: any) => ({
          message: {
            role: c.message.role,
            content: c.message.content || '',
          },
          finish_reason: c.finish_reason || 'stop',
        })),
        usage: {
          prompt_tokens: data.usage?.prompt_tokens || 0,
          completion_tokens: data.usage?.completion_tokens || 0,
          total_tokens: data.usage?.total_tokens || 0,
        },
      };
    } catch (e: any) {
      if (e instanceof ApplicationError) throw e;
      throw new ApplicationError('PROVIDER_ERROR', e.message || 'API connection failed');
    }
  }

  public async stream(request: GatewayChatRequest, apiKey: string): Promise<ReadableStream<GatewayStreamChunk>> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: request.model,
          messages: request.messages,
          temperature: request.temperature,
          max_tokens: request.maxTokens,
          response_format: request.jsonMode ? { type: 'json_object' } : undefined,
          tools: request.tools ? request.tools.map((t) => ({ type: 'function', function: t })) : undefined,
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApplicationError(
          'PROVIDER_ERROR',
          errorData?.error?.message || `Streaming request failed with status ${response.status}`
        );
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      return new ReadableStream<GatewayStreamChunk>({
        async start(controller) {
          if (!reader) {
            controller.close();
            return;
          }
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop() || '';

              for (const line of lines) {
                const cleanLine = line.trim();
                if (!cleanLine.startsWith('data: ')) continue;
                const dataStr = cleanLine.substring(6);
                if (dataStr === '[DONE]') continue;

                try {
                  const parsed = JSON.parse(dataStr);
                  const choice = parsed.choices?.[0];
                  if (choice) {
                    controller.enqueue({
                      id: parsed.id,
                      model: parsed.model,
                      delta: {
                        content: choice.delta?.content || '',
                        role: choice.delta?.role || undefined,
                      },
                      finish_reason: choice.finish_reason || null,
                    });
                  }
                } catch {
                  // Ignore JSON parse errors in partial stream lines
                }
              }
            }
            controller.close();
          } catch (err: any) {
            controller.error(err);
          }
        },
      });
    } catch (e: any) {
      if (e instanceof ApplicationError) throw e;
      throw new ApplicationError('PROVIDER_ERROR', e.message || 'API connection failed');
    }
  }

  public async testConnection(apiKey: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}
