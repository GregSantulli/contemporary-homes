class ApiController < ApplicationController

  def listings
    if params[:id] == nil
      @all_listings = Listing.all
    else
      @all_listings = [Listing.find(params[:id])]
    end
    render json: @all_listings
  end

end
