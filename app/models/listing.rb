class Listing < ActiveRecord::Base

  validates :address, presence: true


  geocoded_by :full_address
  after_validation :geocode
  has_many :photos
  accepts_nested_attributes_for :photos

end
