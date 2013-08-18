module ApplicationHelper

  IOS_DEVICE_WIDTH = {
    :ipad => 768,
    :ipad_retina => 1536,
    :iphone_retina => 640
  }

  def ios_startup_image_tag(image, device, orientation)
    tag :link, rel: 'apple-touch-startup-image', 
              href: path_to_image(image),
              media: ios_media_query(device, orientation)
  end

  def ios_touch_icon_tag(image, size)
    tag :link, rel: 'apple-touch-icon-precomposed', href: path_to_image(image), sizes: size
  end

  def ios_media_query(device, orientation)
    width = '%spx' % IOS_DEVICE_WIDTH[device]
    query = "(device-width: #{width}) and (orientation: #{orientation})"
    if device =~ /retina/
      query.concat "and (-webkit-device-pixel-ratio: 2)"
    end
    query
  end

end
