# Firebase - Hortalis (Mapa)

## Estrutura do Firestore

Colecao `hortas` (dados minimos para o mapa):
- `nome` (string)
- `cidade` (string)
- `descricaoCurta` (string)
- `location` (GeoPoint)
- `tags` (array de string, opcional)
- `ativo` (boolean)

Subcolecao para detalhes sob demanda:
- `hortas/{hortaId}/detalhes/principal`
  - `descricaoCompleta` (string)
  - `ofertas` (array de string)
  - `imagens` (array de string)
  - `contato` (objeto opcional)

Colecao `favoritos` (por usuario):
- `favoritos/{userId}`
  - `hortaIds` (array de string)
  - `updatedAt` (timestamp)

## Modelo eficiente

- Carregar o mapa com `getDocs` na colecao `hortas` usando apenas campos minimos.
- Buscar detalhes sob demanda com `getDoc` em `hortas/{id}/detalhes/principal`.
- Evitar trazer `descricaoCompleta` e `imagens` no carregamento inicial.

## Favoritos

- Persistir favoritos por `userId` em um unico documento.
- Usar `arrayUnion` e `arrayRemove` para toggle rapido.
- Se a lista crescer muito, migrar para subcolecao `favoritos/{userId}/hortas`.

## Performance

- Preferir `getDocs` com `limit` para o mapa.
- Evitar `onSnapshot` no mapa principal.
- Cachear resultados em memoria e reutilizar entre telas quando possivel.
- Evitar multiplas leituras para o mesmo ponto de interesse.

## Busca

- Filtrar por `cidade` ou `tags` com `where` simples.
- Para texto livre, limitar a prefixos ou usar campos normalizados.
- Evitar queries compostas complexas e ordenacoes caras.

## Limites do plano gratuito

- Reduzir reads por sessao.
- Evitar listeners ativos permanentes.
- Prefira atualizacoes pontuais ao inves de streams continuos.
