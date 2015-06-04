class PhotoUploader < CarrierWave::Uploader::Base

  include CarrierWave::MiniMagick
  include CarrierWave::MimeTypes

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
    process resize_to_fill: [1500,750]
  end


  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

end
