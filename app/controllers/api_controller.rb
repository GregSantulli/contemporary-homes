class ApiController < ApplicationController

  def listings
    if params[:id] == nil
      @all_listings = Listing.all
    else
      @all_listings = [Listing.find(params[:id])]
    end
    render json: @all_listings
  end


  def photo
    p params
    @photo = Photo.where(listing_id: params[:id]).first
    render json: @photo


  end



end
