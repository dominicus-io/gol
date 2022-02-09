
# Game of Life

Il presente pacchetto contiene un'applicazione CRA il quale implementa l'automa cellurare chiamato appunto ["Game of Life"](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) sotto forma di griglia HTML





## Run Locally

Clone the project

```bash
  git clone https://github.com/dominicus-io/gol.git
```

Go to the project directory

```bash
  cd gol
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn start
```


## Usage/Examples

Visualizzata la pagina bastera caricare un file txt tramite il pulsante **Upload** nel seguente formato:

```
.*.....
...*...
**..***
```

Il carattere "." rappresenta celle morte/inattive mentre il carattere "*" rappresenta celle in vita. 

Tutte le righe devono essere della stessa lunghezza e gli unici caratteri ammessi sono quelli sopra descritti ho l'applicazione non carichera il file e mostrera un messaggio di errore.

Successivamente si potra premere il pulsante **Start** per avviare il gioco e l'applicazione iniziera a generare a cadenza di un secondo alla volta tutte le permutazioni della griglia seguendo le [regole del gioco](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules)

Si possono utlizzare anche i pulsanti:

- **Next** - Genera la prossima permutazione della griglia solo *se il gioco non è avviato*
- **Reset** - Resetta la griglia allo stato iniziale di quando si era caricato il file solo *se il gioco non è avviato*
- **Stop** - Ferma il gioco *compare solo se è avviato*
## API Reference

### Grid

```typescript
type Grid = {
    alive: Array<number>;
    n_rows: number;
    n_cols: number;
}
```
Rappresenta lo stato di una griglia `n_rows` * `n_cols` contenente celle in vita agli indici presenti in `alive`.

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `alive`   | `Array<number>` | Una lista ordinata di indici delle celle in vita |
| `n_rows`  | `number` | Il numero di righe della griglia |
| `n_cols`  | `number` | Il numero delle colonne della griglia |


#### nextPerm(currentState: Grid)

Ritorna una lista ordinata degli indici delle prossime celle vive

Il funzionamento è molto semplice:  
Per ogni elemento in `currentState.alive` si recuperano i vicini(sia inattivi sia vivi) e i vicini inattivi, la differenza tra il numero di vicini e il numero di vicini inattivi, 
se compreso tra 2 e 3 (inclusi), indicherà se l'elemento deve restare in vita, 
successivamente per ognuno dei vicini inattivi dell'elemento si recuperano, a loro volta, i vicini e si vanno a ricercare all'interno `currentState.alive` tramite ricerca binaria, 
se il numero dei match è uguale a 3 allora si aggiunge l'elemento inattivo all'interno della collezione degli elementi in vita.

La complessita temporale è di **O(nlog(n))** dove **n** = `currentState.alive.length`

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `currentState`   | `Grid` | Lo stato corrente della griglia |


