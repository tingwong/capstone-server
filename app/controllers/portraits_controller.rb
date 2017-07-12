class PortraitsController < ApplicationController


  def index
  end

  def process_image
    # Write binary image to file
    File.open('static/test.png',"wb") do |file|
      file.write(Base64.decode64(params[:canvasURL]))
    end

    render status: :ok, json: {}
    # Resize canvas
    `python ../tools/dockrun.py python ../tools/process.py \
      --input_dir capstone-server/static \
      --operation resize \
      --output_dir resized`

    # Process canvas to portrait
    # Combine canvas with portraits
    # Send portrait-only back to front-end

  end

  private
  def image_params
    params.require(:canvasURL)
  end

end
