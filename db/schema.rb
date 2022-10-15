# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_10_15_194936) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "b_rows", force: :cascade do |t|
    t.bigint "board_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_id"], name: "index_b_rows_on_board_id"
  end

  create_table "boards", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "room_id"
    t.index ["room_id"], name: "index_boards_on_room_id"
  end

  create_table "cells", force: :cascade do |t|
    t.bigint "row_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["row_id"], name: "index_cells_on_row_id"
  end

  create_table "pieces", force: :cascade do |t|
    t.bigint "cell_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cell_id"], name: "index_pieces_on_cell_id"
  end

  create_table "rooms", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rows", force: :cascade do |t|
    t.bigint "sub_board_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sub_board_id"], name: "index_rows_on_sub_board_id"
  end

  create_table "sub_boards", force: :cascade do |t|
    t.bigint "b_row_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["b_row_id"], name: "index_sub_boards_on_b_row_id"
  end

end
