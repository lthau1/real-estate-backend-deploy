import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import type { MaybeRef } from 'vue';
import { toValue } from 'vue';
import type { Property } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// ── Generic fetch helper ─────────────────────────────────────────
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// ── Types returned by the API ────────────────────────────────────
export interface ApiProperty extends Property {
  location: string;
  category: string;
  type: string;
  description: string;
  agent_id: string;
  agent?: {
    name: string;
    phone: string;
    email: string;
    photo: string;
  };
}

export interface ApiAgent {
  id: string;
  name: string;
  role: string;
  title: string;
  phone: string;
  office: string;
  mobile: string;
  email: string;
  image: string;
  image_url: string;
  photo: string;
  bio: string;
}

export interface PropertyFilters {
  category?: string;
  type?: string;
  location?: string;
  page?: number;
  limit?: number;
}

// ── useProperties ────────────────────────────────────────────────
export function useProperties(filters: MaybeRef<PropertyFilters> = {}) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
      const f = toValue(filters);
      const params = new URLSearchParams();
      if (f.category) params.set('category', f.category);
      if (f.type) params.set('type', f.type);
      if (f.location) params.set('location', f.location);
      if (f.page) params.set('page', String(f.page));
      if (f.limit) params.set('limit', String(f.limit));

      const qs = params.toString();
      return apiFetch<{ properties: ApiProperty[]; pagination: { page: number; limit: number; total: number; totalPages: number } }>(
        `/api/properties${qs ? `?${qs}` : ''}`
      );
    },
    staleTime: 5 * 60 * 1000,  // 5 min — client-side HTTP caching
    gcTime: 10 * 60 * 1000,    // 10 min in memory
  });
}

// ── useProperty (single) ─────────────────────────────────────────
export function useProperty(id: MaybeRef<string>) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => apiFetch<ApiProperty>(`/api/properties/${toValue(id)}`),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!toValue(id),
  });
}

// ── useAgents ────────────────────────────────────────────────────
export function useAgents() {
  return useQuery({
    queryKey: ['agents'],
    queryFn: () => apiFetch<{ agents: ApiAgent[] }>('/api/agents'),
    staleTime: 10 * 60 * 1000,
  });
}

// ── useSubmitContact ─────────────────────────────────────────────
export function useSubmitContact() {
  return useMutation({
    mutationFn: (data: { name: string; email: string; phone: string; message: string }) =>
      apiFetch('/api/contacts', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });
}

// ── useInvalidateProperties (for SSE) ───────────────────────────
export function useInvalidateProperties() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['properties'] });
}
