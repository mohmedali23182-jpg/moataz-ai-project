export interface IRepository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  deleteById(id: string): Promise<void>;
}

export interface Workspace {
  id: string;
  organizationId?: string;
  name: string;
  slug: string;
  createdAt: string;
}

export interface Project {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  projectId: string;
  title: string;
  modelId: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  tokens: number;
  createdAt: string;
}

export interface FileRecord {
  id: string;
  projectId: string;
  folderId?: string;
  name: string;
  size: number;
  mimeType: string;
  storagePath: string;
  status: 'uploaded' | 'scanning' | 'indexed' | 'error';
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface IWorkspaceRepository extends IRepository<Workspace> {
  findBySlug(slug: string): Promise<Workspace | null>;
}

export interface IProjectRepository extends IRepository<Project> {
  findByWorkspaceId(workspaceId: string): Promise<Project[]>;
}

export interface IConversationRepository extends IRepository<Conversation> {
  findByProjectId(projectId: string): Promise<Conversation[]>;
}

export interface IMessageRepository extends IRepository<Message> {
  findByConversationId(conversationId: string): Promise<Message[]>;
  saveBulk(messages: Message[]): Promise<Message[]>;
}

export interface IFileRepository extends IRepository<FileRecord> {
  findByProjectId(projectId: string): Promise<FileRecord[]>;
}
