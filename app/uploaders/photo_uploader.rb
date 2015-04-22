# encoding: utf-8

class PhotoUploader < CarrierWave::Uploader::Base

  include CarrierWave::MiniMagick
  include CarrierWave::MimeTypes

  # storage :file
  storage :fog

  process :set_content_type

  version :thumb do
    process resize_to_fill: [200,100]
  end

  version :small do
    process resize_to_fill: [400,200]
  end

  version :large do
    process resize_to_fill: [800,400]
  end

  version :banner do
    process resize_to_fill: [1500,400]
  end


  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # Process files as they are uploaded:
  # process :scale => [200, 300]
  #
  # def scale(width, height)
  #   # do something
  # end

  # Create different versions of your uploaded files:


  # version :thumb do
  #   process :resize_to_fit => [32, 32]
  # end

  # version :preview do
  #   process :resize_to_fit => [256, 256]
  # end

  # version :full do
  #   process :resize_to_fit => [2048, 2048]
  # end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end

end
