# cubomm

## Exemplo interativo: esconder tempo até término

Incluí um exemplo simples que implementa a opção de ocultar o tempo durante a montagem e só mostrar o tempo ao final.

- Abra [site-example/index.html](site-example/index.html#L1-L1) no navegador.
- Ou abra [index.html](index.html#L1-L1) na raiz do repositório — ele redireciona para o exemplo.

Os arquivos do exemplo estão em [site-example](site-example/README.md#L1-L1).

Testes E2E
----------

Adicionei testes E2E com Playwright. Para rodá-los:

```bash
npm install
# instalar browsers do playwright
npx playwright install
# iniciar servidor estático
npm run start:site &
npm run test:e2e
```

Os testes abrem `site-example` e verificam o comportamento de ocultar/mostrar o tempo.
