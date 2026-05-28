export interface ContactItem {
  id: string
  label: string
  value: string
  url: string
  icon: string
}

export const contacts: ContactItem[] = [
  {
    id: 'github',
    label: 'GitHub',
    value: 'atreides-jimmy',
    url: 'https://github.com/atreides-jimmy',
    icon: 'github',
  },
  {
    id: 'email',
    label: 'Email',
    value: 'jimmy@example.com',
    url: 'mailto:jimmy@example.com',
    icon: 'mail',
  },
]
