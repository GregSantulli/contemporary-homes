module ListingsHelper


  def get_full_address(listing)
    "#{listing.address}, #{listing.city}, #{listing.state} #{listing.zipcode}"
  end


end
