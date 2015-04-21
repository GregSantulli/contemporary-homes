class WelcomeController < ApplicationController

  def index

    if params[:id] == nil
      @all_listings = Listing.all
    else
      @all_listings = [Listing.find(params[:id])]
    end

    if request.xhr?
      render json: @all_listings
    end

  end


end
