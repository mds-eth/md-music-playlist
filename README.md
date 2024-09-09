# 🎵 MD Music Preview Playlist

**MD Music Preview Playlist** é uma aplicação de prévias musicais integrada à API do Spotify, desenvolvida com **Next.js**, **TypeScript** e **Tailwind CSS**. O projeto oferece uma experiência imersiva para os usuários explorarem playlists, músicas e artistas, além de um player de música com drag and drop e navegação intuitiva.

## 🚀 Funcionalidades

- **Dashboard com Gêneros Musicais**: Exibição de categorias de músicas baseadas nos gêneros mais populares.
- **Listagem de Playlists**: Explore playlists populares e suas músicas diretamente no aplicativo.
- **Menu com Listagem de Músicas**: Exibição de músicas detalhadas ao selecionar uma playlist.
- **Player de Música com Drag and Drop**: Player flutuante e móvel que pode ser arrastado para diferentes partes da tela.
- **Menu Lateral com Últimas Músicas Ouvidas**: Acompanhe as 10 últimas músicas reproduzidas em um menu lateral fácil de acessar.
- **Pesquisa por Playlists e Artistas**: Encontre suas músicas favoritas pesquisando por playlists ou cantores diretamente na interface.
- **Integração com a API do Spotify**: Toda a listagem e reprodução das prévias musicais é feita através da API oficial do Spotify.

## 🛠️ Tecnologias Utilizadas

- **Next.js**: Framework React para criação de interfaces web.
- **TypeScript**: Tipagem estática para melhorar a manutenção e a robustez do código.
- **Tailwind CSS**: Framework de utilitários CSS para estilização eficiente e responsiva.
- **Spotify API**: Integração com a API oficial do Spotify para autenticação, listagem de playlists e reprodução de faixas.

## 📦 Como Executar o Projeto Localmente

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/mds-eth/md-music-playlist.git
   ```

2. **Navegue até o diretório**:

   ```bash
   cd md-music-playlist

   ```

3. **Instale as dependências**:

   ```bash
   yarn e ou npm install

   ```

4. **Configure as variáveis de ambiente: Crie um arquivo .env.local na raiz do projeto com as seguintes variáveis:**:

   ```bash
   NEXT_PUBLIC_SPOTIFY_CLIENT_ID=seu_cliente_id
   NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=seu_cliente_secret
   NEXT_PUBLIC_URL_API_SPOTIFY=url_api_spotify
   NEXT_PUBLIC_URL_API_TOKEN_SPOTIFY=url_api_token

   ```

5. **Inicie o server**:
   ```bash
   yarn dev
   ```

## 📂 Estrutura do Projeto

```bash
.
├── public/
│   └── assets/
├── src/
│   ├── app/
│   │   ├── categories/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── mocks/
│   │   ├── types/
│   │   ├── favicon.ico/
│   │   ├── globals.css/
│   │   ├── layout.tsx/
│   │   ├── page.tsx/
│   ├── constants/
│   ├── services/
│   └── utils/
│   └── validations/
├── .env.local
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```
