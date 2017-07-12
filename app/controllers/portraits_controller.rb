class PortraitsController < ApplicationController
  @@image_count = 1

  def index
  end

  def process_image
    # Naming of unique image
    file_name = "image_" + @@image_count.to_s + ".png"

    # Write binary image to file
    File.open("static/" + file_name,"wb") do |file|
      file.write(Base64.decode64(params[:canvasURL]))
    end

    # Resize canvas
    `python ../tools/dockrun.py python ../tools/process.py \
      --input_dir static \
      --operation resize \
      --output_dir ../test-resized/`

    # Process canvas to portrait
    `python ../tools/dockrun.py python ../server/tools/process-local.py \
      --model_dir ../models/renaissance \
      --input_file ../test-resized/{} \
      --output_file ../test-output/{}`.format(file_name)

      # `python ../tools/dockrun.py python ../server/tools/process-local.py \
      #   --model_dir ../models/#{params[:style]} \
      #   --input_file ../test-resized/#{file_name} \
      #   --output_file ../test-output/#{file_name}`

    # Combine canvas with portraits
    `python ../tools/dockrun.py python ../tools/process.py \
      --input_dir ../test-resized \
      --b_dir ../test-output/ \
      --operation combine \
      --output_dir ../before-after`

    # Send portrait-only back to front-end

    @@image_count += 1
    render status: :ok, json: {}
  end

  private
  def image_params
    params.require(:canvasURL)
  end

end
