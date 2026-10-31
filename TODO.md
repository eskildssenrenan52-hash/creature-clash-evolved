## Reutilização inteligente do catálogo Kaetram
- [x] Indexar as 1.316 entradas por categoria para seleção eficiente sem varrer o catálogo a cada frame.
- [x] Usar correspondência exata e fallback determinístico para mobs autorais, distribuindo sprites Kaetram por inimigo.
- [x] Reutilizar árvores, rochas, bushes, cristais e objetos Kaetram no cenário com fallback para a arte existente.
- [x] Reutilizar effects Kaetram nos golpes de espada, lança, arco e cajado, mantendo os efeitos detalhados do jogo.
- [x] Regenerar o APK offline com a integração visual atualizada.

## Áudio local do Kaetram
- [x] Copiar músicas e efeitos do Kaetram para `public/kaetram/audio`, mantendo-os dentro do pacote principal e disponíveis offline.
- [x] Selecionar automaticamente músicas locais por bioma e música de chefe, com efeitos locais para combate, cura, loot, UI, teleporte e progressão.
- [x] Manter fallback sintetizado quando o navegador bloqueia ou não encontra um arquivo de áudio.
- [x] Reempacotar e validar o APK offline com os novos arquivos de áudio.

## Tutorial de primeira jornada
- [x] Iniciar uma nova jornada, quando não houver save/tutorial concluído, em uma dungeon tutorial curta de 3 andares.
- [x] Ensinar movimento, ataque, esquiva/posicionamento, uso de poções/éteres e magia durante a dungeon.
- [x] Colocar um chefe exclusivo no terceiro andar, com ataques e efeitos do sistema de chefes existente.
- [x] Liberar a entrada no mundo principal após vencer o chefe ou permitir pular a dungeon.
- [x] Exibir um segundo tutorial, pulável e de primeira vez, explicando HUD, inventário, herói/atributos, missões, mapa, crônica, descobertas, bestiário, grimório, grande crônica, pets, aparência, casa, cultivo, construção e oficinas.
- [x] Executar build, testes e checkpoint final com o tutorial e o áudio no APK.
