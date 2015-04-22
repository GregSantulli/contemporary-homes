class Listing < ActiveRecord::Base
  geocoded_by :full_address
  after_validation :geocode
  has_many :photos
  accepts_nested_attributes_for :photos
end
