class ListingsController < ApplicationController
  def show
    @listing = Listing.find(params[:id])
  end

  def new
    @listing = Listing.new

  end

  def create
    @listing = Listing.new(listing_params)
    # binding.pry
    if @listing.save
     params['photos'].each do |a|
      @photo = @listing.photos.create!(:photo => a, :listing_id => @listing.id)
      end
      redirect_to @listing
    else
       # format.html { render action: 'new' }
       redirect_to '/'
     end
   end

   def update
    listing = Listing.find(params[:id])
    listing.update_attributes(listing_params)
    listing.save
    redirect_to listing_path
  end

  private

  def listing_params
    params.require(:listing).permit(:name, :address, :active, :price)
  end


end
