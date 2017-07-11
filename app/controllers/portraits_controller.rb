class PortraitsController < ApplicationController


  def index
  end

  def process_image
    # Write binary image to file
    File.open('test.png',"wb") do |file|
      file.write(Base64.decode64(params[:canvasURL]))
    end

    render status: :ok, json: {}
    # Resize canvas


    # Process canvas to portrait
    # Combine canvas with portraits
    # Send portrait-only back to front-end

  end

  private
  def image_params
    params.require(:canvasURL)
  end

end
