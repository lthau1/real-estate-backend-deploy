/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('agents', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('title');
    table.string('phone');
    table.string('email');
    table.string('image_url');
    table.text('bio');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('agents');
};
