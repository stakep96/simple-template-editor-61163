# Setup do Banco de Dados - Lovable Cloud

Este documento explica como configurar a tabela necessária para o sistema de salvamento compartilhado de templates.

## Instruções

1. **Acesse o Lovable Cloud**:
   - Clique na aba "Cloud" no topo da interface do Lovable
   - Vá para a seção "Database"

2. **Execute o SQL abaixo**:
   - Clique em "SQL Editor" ou equivalente
   - Cole e execute o seguinte código SQL:

```sql
-- Criar tabela site_templates para armazenar configurações dos sites
create table if not exists site_templates (
  id uuid primary key default gen_random_uuid(),
  template_id text not null unique,
  config jsonb not null,
  updated_at timestamp with time zone default now()
);

-- Habilitar RLS (Row Level Security)
alter table site_templates enable row level security;

-- Permitir acesso público de leitura
create policy "Allow public read access"
  on site_templates
  for select
  to public
  using (true);

-- Permitir acesso público de escrita (para salvar configurações)
create policy "Allow public write access"
  on site_templates
  for insert
  to public
  with check (true);

-- Permitir acesso público de atualização
create policy "Allow public update access"
  on site_templates
  for update
  to public
  using (true);

-- Criar índice para buscas mais rápidas
create index if not exists site_templates_template_id_idx on site_templates (template_id);
```

3. **Pronto!** O sistema agora está configurado para:
   - Salvar templates no banco de dados compartilhado
   - Sincronizar entre diferentes dispositivos
   - Manter cada template independente (jurídico, dentista, agência)

## Como Funciona

- **Template ID '1'**: Site Jurídico (Preview padrão - `/preview`)
- **Template ID '6'**: Agência Digital (`/preview-agencia`)
- **Template ID '9'**: Clínica Dentária (`/preview-dentista`)

Quando você salva um template no editor principal, ele é salvo tanto no localStorage (backup local) quanto no banco de dados (compartilhado). As páginas de preview sempre carregam do banco de dados, garantindo que todos vejam a mesma versão.

## Segurança

⚠️ **Nota sobre RLS público**: As políticas acima permitem acesso público porque este é um sistema de demonstração/portfólio. Para um ambiente de produção com múltiplos usuários, você deve:

1. Adicionar autenticação de usuários
2. Modificar as políticas RLS para restringir acesso baseado em `auth.uid()`
3. Adicionar coluna `user_id` na tabela para associar templates a usuários específicos

## Troubleshooting

Se encontrar erros ao salvar/carregar:
1. Verifique se a tabela foi criada corretamente no Cloud → Database
2. Confirme que as políticas RLS estão ativas
3. Verifique o console do navegador para mensagens de erro detalhadas
