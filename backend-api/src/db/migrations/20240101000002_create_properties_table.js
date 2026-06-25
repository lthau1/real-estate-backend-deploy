/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('properties', (table) => {
    table.string('id').primary();
    table.string('title').notNullable();
    table.decimal('price', 15, 2);
    table.string('location');
    table.string('category');   // house | apartment | villa
    table.string('type');       // for-sale | for-rent
    table.integer('bedrooms').defaultTo(0);
    table.integer('bathrooms').defaultTo(0);
    table.integer('garages').defaultTo(0);
    table.decimal('area', 10, 2).defaultTo(0);
    table.string('status').defaultTo('available');
    table.string('image_url');
    table.text('description');
    table.string('agent_id').references('id').inTable('agents').onDelete('SET NULL');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('properties');
};
