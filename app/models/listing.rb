class Listing < ActiveRecord::Base
  geocoded_by :address
  after_validation :geocode
  has_many :photos
  accepts_nested_attributes_for :photos
end
