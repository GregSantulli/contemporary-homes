class ListingsController < ApplicationController

  include ListingsHelper
  before_action :valid_user, only: [:create, :new, :edit, :update]

  def show
    @listing = Listing.find(params[:id])
  end

  def new
    @listing = Listing.new
    @all_listings = Listing.all
  end

  def create
    @all_listings = Listing.all
    @listing = Listing.new(listing_params)
    @listing.full_address = get_full_address(@listing)
    if @listing.save
      if params['photos'] != nil
        params['photos'].each do |a|
          @photo = @listing.photos.create!(:photo => a, :listing_id => @listing.id)
        end
      end
      redirect_to new_listing_path
    else
       render 'new'
     end
   end

   def update
    listing = Listing.find(params[:id])
    listing.update_attributes(listing_params)
    if listing.save
      if params['photos'] != nil
        params['photos'].each do |a|
          @photo = listing.photos.create!(:photo => a, :listing_id => listing.id)
        end
      end
    end
    redirect_to new_listing_path
  end

  def edit
    @listing = Listing.find(params[:id])

  end

  def destroy
    listing = Listing.find(params[:id])
    listing.destroy
    redirect_to new_listing_path
  end

  private

  def listing_params
    params.require(:listing).permit(:address, :city, :state, :zipcode, :bedroom, :bathroom, :footage, :active, :price)
  end

  def valid_user
    redirect_to :root unless session[:user_id]
  end



end
