const schema =     {
  "title": "hero schema",
  "version": 0,
  "description": "describes a simple hero",
  "type": "object",
  "properties": {
      "name": {
          "type": "string",
          "primary": true
      },
      "color": {
          "type": "string"
      },
      "healthpoints": {
          "type": "number",
          "min": 0,
          "max": 100
      },
      "birthyear": {
          "type": "number",
          "final": true,
          "min": 1900,
          "max": 2050
      },
      "skills": {
          "type": "array",
          "maxItems": 5,
          "uniqueItems": true,
          "items": {
              "type": "object",
              "properties": {
                  "name": {
                      "type": "string"
                  },
                  "damage": {
                      "type": "number"
                  }
              }
          }
      }
  },
  "required": ["color"],
};

export default async function configure(dbP) {
    const db = await dbP;

    await db.collection({
        name: 'items',
        schema
    });

    return db;
}
