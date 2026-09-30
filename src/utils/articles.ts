export const slugCategory = (name: string) => name.toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const readingMinutes = (body = '') => Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 220));
