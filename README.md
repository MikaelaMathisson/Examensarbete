# Examensarbete Föreningshemsida Arlanda MC


## Förkrav

För att kunna köra projektet behöver du:
- [Docker](https://www.docker.com/) installerat (för att köra PostgreSQL)
- [Node.js](https://nodejs.org/) installerat (minst version 14 eller senare)
- [Git](https://git-scm.com/) installerat
---

## Installation

Följ stegen nedan för att sätta upp projektet:

### 1. Klona projektet

Börja med att klona det här repositoriet och gå in i projektmappen:
```bash
git clone https://github.com/MikaelaMathisson/Examensarbete.git
cd examensarbete
cd app
```


### 2. Byt till rätt branch
```bash
git checkout kalender
```

### 3. Installera beroenden

```bash
npm install
```
### 4. Starta PostgreSQL-databasen
    
```bash
docker-compose up -d
```
### 5. Kontrollera att databasen körs
    
```bash
docker ps   
```

### 6. Starta projektet
    
```bash
next dev    
```


### Databasinfo
Databasen körs i Docker-containern och är förinställd enligt följande:

Databasnamn: postgres

Användarnamn: postgres

Lösenord: mysecretpassword

Port: 5432

### Exempeldata
Vid uppstart fylls databasen med exempeldata, inklusive:

Bokningar (table bookings)

Events (table events)

Du kan granska detta i ett verktyg som pgAdmin eller med terminal.