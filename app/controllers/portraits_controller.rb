class PortraitsController < ApplicationController


  def index
  end

  def process_image
    # Naming of unique image
    image_count = 1
    file_name = "image_" + image_count.to_s

    # Write binary image to file
    File.open('static/' + file_name,"wb") do |file|
      file.write(Base64.decode64(params[:canvasURL]))
    end

    # Resize canvas
    # python
    #
    # file_name = "image_" + str(image_count)

    # `python ../tools/dockrun.py python ../tools/process.py \
    #   --input_dir static \
    #   --operation resize \
    #   --output_dir ../test-resized`



    # Process canvas to portrait
    # `python ../tools/dockrun.py python ../server/tools/process-local.py \
    #   --model_dir ../models/renaissance \
    #   --input_file ../test-resized/test.png \
    #   --output_file ../test-output/test.png`

    # Combine canvas with portraits

    # Send portrait-only back to front-end

    image_count += 1
    render status: :ok, json: {}
  end

  private
  def image_params
    params.require(:canvasURL)
  end

end
