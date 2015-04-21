class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings do |t|
      t.string :name
      t.string :address
      t.float :latitude
      t.float :longitude
      t.boolean :active
      t.integer :price

      t.timestamps null: false
    end
  end
end
