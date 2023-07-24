# MovieCast Backend Web-Service

## Installation
1. Clone Repository
```
git clone https://github.com/gibranfsh/movie-casts-web-service.git
```

2. Move to the folder
```
cd movie-casts-web-service
```

3. Install the dependencies
```
npm install
```

## Configuration
Copy the `.env.example` file to `.env` and update the values according to your environment.

## Installation
1. Ensure that the database server is running (use mysql).
2. Create a new database with the name specified in the `.env` file.

## Running the Application
1. Run the application in development mode: `npm run start:dev`
2. Access the API at `http://localhost:3000`

## API Endpoints Documentation
### 1. Movies
* Get All Movie

HTTP Method     : ```GET```

Endpoint        : ```/movies```

Request Body    : -

Response Body   :
```
{
    "status": "success",
    "message": "Retrieved all movies successfully",
    "data": [
        {
            "id": string,
            "title": string,
            "language": string,
            "status": string,
            "rating": number
        },
        ...
    ]
}
```

* Get Movie by ID

HTTP Method     : ```GET```

Endpoint        : ```/movies/:id```

Request Body    : -

Response Body   :
```
{
    "status": "success",
    "message": "Retrieved movie successfully",
    "data": {
        "id": number,
        "title": string,
        "language": string,
        "status": string,
        "rating": number
    }
}
```

* Post Movie

HTTP Method     : ```POST```

Endpoint        : ```/movies```

Request Body    :
```
{
    "title": string,
    "language": string,
    "status": string,
    "rating": number (between 1 and 5)
}
```

Response Body   :
```
{
    "status": "success",
    "message": "Movie created successfully",
    "data": {
        "title": string,
        "language": string,
        "status": string,
        "rating": number,
        "id": string
    }
}
```

* Update Movie (Patch)

HTTP Method     : ```PATCH```

Endpoint        : ```/movies/:id```

Request Body (Optional)   :
```
{
    "title": string,
    "language": string,
    "status": string,
    "rating": number
}
```

Response Body    :
```
{
    "status": "success",
    "message": "Movie updated successfully",
    "data": {
        "id": string,
        "title": string,
        "language": string,
        "status": string,
        "rating": number
    }
}
```

* Delete Movie

HTTP Method     : ```DELETE```

Endpoint        : ```/movies/:id```

Request Body    : -

Response Body   :
```
{
    "status": "success",
    "message": "Movie deleted successfully",
    "data": {
        "title": string,
        "language": string,
        "status": string,
        "rating": number
    }
}
```

### 2. Casts
* Get All Cast

HTTP Method     : ```GET```

Endpoint        : ```/casts```

Request Body    : -

Response Body   :
```
{
    "status": "success",
    "message": "Retrieved all casts successfully",
    "data": [
        {
            "id": number,
            "name": string,
            "birthday": Date,
            "deadday": Date | null,
            "rating": number,
            "horoscope": string,
            "isLeap": boolean
        },
        ...
    ]
}
```

* Get Cast by ID

HTTP Method     : ```GET```

Endpoint        : ```/casts/:id```

Request Body    : -

Response Body   :
```
{
    "status": "success",
    "message": "Retrieved cast successfully",
    "data": {
        "id": number,
        "name": string,
        "birthday": Date,
        "deadday": Date | null,
        "rating": number
    }
}
```

* Get Languages From an Actor/Cast Where the Movie Rating is Above 4.5

HTTP Method     : ```GET```

Endpoint        : ```/casts/language/:id```

Request Body    : -

Response Body   :
```
{
    "status": "success",
    "message": "Retrieved cast languages successfully",
    "data": [
        string,
        ...
    ]
}
```

* Post Cast

HTTP Method     : ```POST```

Endpoint        : ```/casts```

Request Body    :
```
{
    "name": string,
    "birthday": Date,
    "deadday": Date (optional),
    "rating": number
}
```

Response Body   :
```
{
    "status": "success",
    "message": "Cast created successfully",
    "data": {
        "name": string,
        "birthday": Date,
        "deadday": Date | null,
        "rating": number,
        "id": number
    }
}
```

* Update Cast (Patch)

HTTP Method     : ```PATCH```

Endpoint        : ```/casts/:id```

Request Body (Optional)   :
```
{
    "name": string,
    "birthday": Date,
    "deadday": Date,
    "rating": number
}
``` 

Response Body   :
```
{
    "status": "success",
    "message": "Cast updated successfully",
    "data": {
        "id": number,
        "name": string,
        "birthday": Date,
        "deadday": Date | null,
        "rating": number
    }
}
```

* Delete Cast

HTTP Method     : ```DELETE```

Endpoint        : ```/casts/:id```

Request Body    : -

Response Body   :
```
{
    "status": "success",
    "message": "Cast deleted successfully",
    "data": {
        "name": string,
        "birthday": Date,
        "deadday": Date | null,
        "rating": number
    }
}
```

### 3. Moviecasts
* Get All Moviecast

HTTP Method     : ```GET```

Endpoint        : ```/moviecasts```

Request Body    : -

Response Body   :
```
{
    "status": "success",
    "message": "Retrieved movie-casts successfully",
    "data": [
        {
            "id": number,
            "name": string,
            "casts": [
                {
                    "name": string,
                    "birthday": Date,
                    "deadday": Date | null
                },
                ...
            ]
        },
        ...
    ]
}
```
