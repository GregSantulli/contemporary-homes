class AddDetailsToListings < ActiveRecord::Migration
  def change
    add_column :listings, :bedroom, :integer
    add_column :listings, :bathroom, :integer
    add_column :listings, :footage, :integer
  end
end
