class PortraitsController < ApplicationController


  def index
  end

  def process_image
    # Write binary image to file
    File.open('static/test.png',"wb") do |file|
      file.write(Base64.decode64(params[:canvasURL]))
    end


    # Resize canvas
    `python ../tools/dockrun.py python ../tools/process.py \
      --input_dir static \
      --operation resize \
      --output_dir ../test-resized`

    # Process canvas to portrait
    # Combine canvas with portraits
    # Send portrait-only back to front-end

    render status: :ok, json: {}
  end

  private
  def image_params
    params.require(:canvasURL)
  end

end
